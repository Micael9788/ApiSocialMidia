import { type Request, type Response } from 'express'
import { ZodError, z } from 'zod'
import { UserSchema } from '../../schemas/user'
import bcrypt from 'bcrypt'

const zRegister = z.object(
  {
    userName: z.string(
      { required_error: 'userName is required' }
    ).regex(/^[a-zA-Z0-9_]+$/, 'Nome de usuário Inválido').trim(),
    email: z.string(
      { required_error: 'email is required' }
    ).email('Digite um e-mail válido').trim(),
    password: z.string(
      { required_error: 'password is required' }
    ).min(6).max(150).trim(),
    userPhoto: z.string(
      {
        required_error: 'userPhoto is required'
      }
    ).url().trim()
  }
)

const register = async (req: Request, res: Response) => {
  try {

    const body = zRegister.parse(req.body)

    const userName = await UserSchema.exists({ userName: body.userName })

    if (userName) {
      return res.status(409).json(
        {
          success: false,
          message: 'Nome de usuario já em uso.'
        }
      )
    }

    const emailExist = await UserSchema.exists({ email: body.email })

    if (emailExist) {
      return res.status(409).json(
        {
          success: false,
          message: 'E-mail já em uso.'
        }
      )
    }

    const salt = await bcrypt.genSalt(10)

    const bPass = await bcrypt.hash(body.password, salt)

    await UserSchema.create(
      {
        ...body,
        password: bPass
      }
    )

    return res.status(201).json(
      {
        success: true,
        message: 'Usuário criado co sucesso'
      }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(
        {
          success: false,
          message: error.issues[0].message
        }
      )
    }
  }
}

export { register }
