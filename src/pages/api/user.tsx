import axios from "axios";
import { getSession } from "next-auth/react";
import { endpointUrl } from "src/services/server";

export async function getSessionDetails() {
  const response = await getSession()
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function createNewUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
) {
  const data = {
    firstName,
    lastName,
    email,
    phone,
    password,
  };

  const response = await axios
    .post(`${endpointUrl}/user-account/create-user`, data, {})
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function verifyCode(code: string, email: string) {
  const data = {
    code,
    email,
  };

  const response = await axios
    .post(`${endpointUrl}/user-account/verify-code`, data, {})
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function resendVerificationCode(email: string) {
  const data = {
    email,
  };

  const response = await axios
    .post(`${endpointUrl}/user-account/request-code`, data, {})
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function sendPasswordResetLink(email: string) {
  const data = {
    email,
  };

  const response = await axios
    .post(`${endpointUrl}/user-account/send-password-reset-link`, data, {})
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function createNewPassword(
  passwordResetToken: any,
  password: string
) {
  const data = {
    password,
    token: passwordResetToken,
  };

  const response = await axios
    .post(`${endpointUrl}/user-account/set_new_password`, data)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}

export async function validatePasswordResetToken(token: any) {
  const response = await axios
    .get(`${endpointUrl}/user-account/validate_password_reset_token/${token}`)
    .then((res) => res)
    .catch((err) => err.message);
  return response;
}
