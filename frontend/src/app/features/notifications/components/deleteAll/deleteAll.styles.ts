"use client";
import styled from "styled-components";

export const DeleteAllInvitesButton = styled.div`
  color: #fff;
  text-align: center;
  height: fit-content;
  font-feature-settings: "liga" off, "clig" off;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid rgba(237, 55, 58, 0.85);
  background: rgba(237, 55, 58, 0.85);
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: rgba(237, 55, 58, 0.85);
  }
`;