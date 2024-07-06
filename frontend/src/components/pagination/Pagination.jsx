import React from "react";

export default function Pagination({totalPages=1,currentPage=1,action}) {
  return <>
    <nav aria-label="Page navigation example">
        <ul class="flex text-base h-10 mx-auto justify-center">
            <li>
              <button class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-100 bg-black border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-700 hover:text-gray-200" onClick={()=>{(currentPage>1)?action(currentPage-1):''}}><i class="fa-solid fa-angles-left"></i></button>
            </li>
            {
              Array.from(Array(totalPages),(v,i)=>{
                return (
                  <li>
                    <button class={`flex items-center justify-center px-4 h-10 leading-tight ${(currentPage!=(i+1)?"text-gray-500 bg-white":"text-black bg-gray-200")} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} key={"page"+(i+1)} onClick={()=>{action(i+1)}}>{i+1}</button>
                  </li>
                )
              })
            }
            <li>
              <button class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-100 bg-black border border-s-0 border-gray-300 rounded-e-lg hover:bg-gray-700 hover:text-gray-200"onClick={()=>{(currentPage<totalPages)?action(currentPage+1):''}}><i class="fa-solid fa-angles-right"></i></button>
            </li>
        </ul>
        </nav>
  </>;
}
