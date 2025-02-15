"use client";

import styled, { keyframes } from "styled-components";

const show = keyframes`
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
`;

export const Container = styled.div`
  font-family: "Inter", sans-serif;
  color: #141515;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;

  &.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  &.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: ${show} 0.6s;
  }

  &.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  &.right-panel-active .overlay {
    transform: translateX(50%);
  }

  &.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  &.right-panel-active .overlay-right {
    transform: translateX(100%);
  }
`;

export const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;

  &.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  &.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
`;

export const Overlay = styled.div`
  background: linear-gradient(to right, #007aff, rgb(44, 140, 243));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  &.overlay-left {
    transform: translateX(-20%);
  }

  &.overlay-right {
    right: 0;
    transform: translateX(0);
  }
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Input = styled.input`
  background-color: #eee;
  color: #333;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid #007aff;
  background-color: #007aff;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  &.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
`;

export const H1 = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const P = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

export const Span = styled.span`
  font-size: 12px;
`;
