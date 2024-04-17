import {z} from 'zod';

//for signup, we will be check -> usernam && email

export const usernameValidation =z
        .string()
        .min(2, 'Username must be at least 2 characters')
        .max(20, 'Username must be no more than 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');


export const signUpSchema =z.object({
    username: usernameValidation,

    email: z.string().email({ message: 'Invalid email address' }), //in email , if we give an object {} , we can write there what to show if email is not as per correct format
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),

})


//in mongoose -> for an email we have to write a regex, but in zod , -> it applies regex automatically