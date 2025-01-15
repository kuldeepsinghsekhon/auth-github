import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { timeStamp } from "console"

const prisma = new PrismaClient()
// export const products =  {
//     id: Number,
//     imageUrl:String,
//     name: String,
//     status: String,
//     price: Number,
//     stock: Number,
//     availableAt: timeStamp
//   };
  const products =  prisma.product.findMany()
  export type SelectProduct = typeof products;
  export async function getProducts(
    search: string,
    offset: number
  ): Promise<{
    products: SelectProduct[];
    newOffset: number | null;
    totalProducts: number;
  }> {  
    return {
      products: [],
      newOffset:0,
      totalProducts: 0
    };
  }