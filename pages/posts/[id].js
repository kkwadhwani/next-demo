import {useEffect, useState} from "react"
import { useRouter } from "next/router"
export async function getStaticProps({params}){
  console.log(params.id)
  const fethPosts = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const data = await fethPosts.json()

  return {
    props:{data}
  }
}

export async function getStaticPaths(){
  const fethPosts = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await fethPosts.json()

 let paths  = data.map((i)=>{return {params:{id:i.id.toString()}}})


 return {
  paths:paths,
  fallback:false
 }

}
 export default function Post(props) {
  const [post, setPost]=useState({})
  const data = props.data
  console.log("data is ", data)

  useEffect(()=>{
    if(data){
      setPost(data)
    }
  }, [])
 


 
  return (<>
    <div>This is a post</div>
  <h1>{post.title}</h1>
  <p>{post.body}</p>
    </>

  )
}
