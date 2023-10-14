import yup from "yup";
import { authUserSchemaDB } from "../../schemas/auth/auth.user";

const authUserSchema = yup.object().shape(
  {
    userName: yup.string().required("nome de usuario obrigatorio"),
    email: yup.string().required("email de usuario obrigatorio"),
    password: yup.number().max(16).min(6).required("senha de usuario obrigatorio"),
    userPhoto: yup.string(),
    userFollowers: yup.number(),
    verified: yup.boolean()
  }
)

// usuario create
export const authCreate = async () => {

    try {

        const { 
          userName,
          email,
          password,
          userPhoto,
          userFollowers,
          verified } = req.body;
    
        const userExistingDB = await authUserSchemaDB.findOne({ email });

        if (userExistingDB) {
           return res.status(400).json(
             { 
               status: 400,
               message: "usuario ja registrado com esse email" 
             }
          );
        }
    
        const authCreateUser = new authUserSchemaDB(
          { 
            userName,
            email,
            password,
            userPhoto,
            userFollowers,
            verified
          }
        );

    
        await authUserSchemaDB.create();
    
        return res.status(200).json(
          {
            status: 200,
            menubar: "usuario registrado com sucesso"
          }
        );

      } catch (error) {

        return res.status(400).json(
          {
            status: 400,
            message: "error ao registrar usuario" 
          }
        );

      }

}


export const authLogin = () => {

   

}