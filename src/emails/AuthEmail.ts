import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "UpTask <admin@uptask.com>",
      to: user.email,
      subject: "UpTask - Confirmar cuenta",
      text: "UpTask - Confirmar cuenta",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px; color: #333;">
                <h2 style="color: #333;">Hola, ${user.name}</h2>
                <p style="font-size: 16px;">Has creado tu cuenta en <strong>UpTask</strong>. ¡Ya casi está todo listo! Solo debes confirmar tu cuenta.</p>
                <p style="font-size: 16px;">Visita el siguiente enlace para confirmar tu cuenta:</p>
                <a href="" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Confirmar cuenta</a>
                <p style="font-size: 16px;">Además, ingresa el siguiente código:</p>
                <p style="font-size: 20px; font-weight: bold; background-color: #e9ecef; padding: 10px; border-radius: 5px; text-align: center; letter-spacing: 1.5px;">${user.token}</p>
                <p style="font-size: 14px; color: #666;">Este token expira en 10 minutos.</p>
            </div>
      `,
      //   html: `<p>Hola: ${user.name}, has creado tu cuenta en UpTask, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
      //   <p>Visita el siguiente enlace:</p>
      //   <a href="">Confirmar cuenta</a>
      //   <p>E ingresa el código: <b>${user.token}</b></p>
      //   <p>Este token expira en 10 minutos</p>
      //   `,
    });
    // return info
  };
}
