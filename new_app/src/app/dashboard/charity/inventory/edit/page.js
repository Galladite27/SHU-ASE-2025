"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const charityId = router.state?.item_id;
  console.log("After Push id" , charityId)
  return (
    <h2>Edit</h2>
  )
}
