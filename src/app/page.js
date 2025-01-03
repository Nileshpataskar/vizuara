'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {

  const router=useRouter()
  useEffect(()=>{
    console.log("onload")
    router.push("/pages/search-flight")
  },[])
  return (
    <div>
      
    </div>
  );
};

export default page;
