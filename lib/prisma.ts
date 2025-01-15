
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()
export default prisma;

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