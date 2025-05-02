import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="text-charcoal h-screen w-full flex flex-col items-center justify-center" style={{backgroundColor:'#fff1e6'}}>
      <div id="logo"> 
        <img src="/assets/Logo.png" className=""></img>
      </div>
      <h1 style={{color:'#36454F'}}className="text-3xl font-bold
      ">Welcome to Hollow</h1>
      <div className="  rounded-3xl flex flex-row items-center">
        <Link href="/login">
        <button className="text-white w-30 h-15 rounded-xl text-charcoal text-xl m-5 bg-blue-900 shadow-lg hover:scale-110 font-bold">Login</button>
        </Link> <br></br>
        <Link href="/signup">
        <button className="bg-gray-300 text-black w-30 h-15 rounded-xl text-charcoal text-xl m-5 shadow-lg hover:scale-110 font-bold">Sign Up</button>
        </Link>

      </div>
    </div>
  );
}
