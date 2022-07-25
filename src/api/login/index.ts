import Request from "@/api";
export const login = (data:any) =>{
  return Request.get('/login',data)
}