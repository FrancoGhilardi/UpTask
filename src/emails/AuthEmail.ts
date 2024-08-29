import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    await transporter.sendMail({
      from: "UpTask <admin@uptask.com>",
      to: user.email,
      subject: "UpTask - Confirmar cuenta",
      text: "UpTask - Confirmar cuenta",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; color: #333;">
                <h2 style="color: #333;">Hola, ${user.name}</h2>
                <p style="font-size: 16px;">Has creado tu cuenta en <strong>UpTask</strong>. ¡Ya casi está todo listo! Solo debes confirmar tu cuenta.</p>
                <p style="font-size: 16px;">Visita el siguiente enlace para confirmar tu cuenta:</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Confirmar cuenta</a>
                <p style="font-size: 16px;">Además, ingresa el siguiente código:</p>
                <p style="font-size: 20px; font-weight: bold; background-color: #e9ecef; padding: 10px; border-radius: 5px; text-align: center; letter-spacing: 1.5px;">${user.token}</p>
                <p style="font-size: 14px; color: #666;">Este token expira en 10 minutos.</p>
            </div>
      `,
    });
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    await transporter.sendMail({
      from: "UpTask <admin@uptask.com>",
      to: user.email,
      subject: "UpTask - Reestablece tu contraseña",
      text: "UpTask - Reestablece tu contraseña",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; color: #333;">
                <h2 style="color: #333;">Hola, ${user.name}</h2>
                <p style="font-size: 16px;">Has solicitado restablecer tu contraseña.</p>
                <p style="font-size: 16px;">Visita el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Restablecer contraseña</a>
                <p style="font-size: 16px;">Además, ingresa el siguiente código:</p>
                <p style="font-size: 20px; font-weight: bold; background-color: #e9ecef; padding: 10px; border-radius: 5px; text-align: center; letter-spacing: 1.5px;">${user.token}</p>
                <p style="font-size: 14px; color: #666;">Este token expira en 10 minutos.</p>
              </div>
      `,
    });
  };
}
