from fastapi import APIRouter, File, Form
from typing_extensions import Annotated
from PIL import Image

admin_router = APIRouter(prefix="/api/admin", tags=["admin"])


@admin_router.post("/upload_image")
async def upload_image(file: Annotated[bytes, File()], extension: Annotated[str, Form()] = "png",
                       filename: Annotated[str, Form()] = "new"):
    with open(f"app/static/images/{filename}.{extension}", "wb") as f:
        f.write(file)

    image = Image.open(f"app/static/images/{filename}.{extension}")
    image = image.convert("RGB")

    image.save(f"app/static/links/{filename}.webp", "webp", optimize=True, quality=100)

    image_link = f"static/links/{filename}.webp"

    return {"ok": True, "message": "Изображение успешно сохранено", "image_link": image_link}
