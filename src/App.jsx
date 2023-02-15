import React, { useState, useCallback } from "react";

function App() {
    const [myData, setMyData] = useState([]);
    const [search, setsearch] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        handleFetch()
    }
    const handleFetch = useCallback(() => {
        if (search == "") {
            return
        }
        fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${search}`)
            .then((response) => response.json())
            .then((data) => {
                
                setMyData(data.hits)
            })
    }, [search])

    const clear = () => {
        setMyData([])
        setsearch("")
    }
    return (
        <div className="box-border m-0 p-0 bg-cyan-900 min-h-screen pb-10">
            <h1 className="text-white text-3xl text-center p-3 sm:p-10">Search Hacker News</h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center" >
                <input type="text"
                    className=" outline-none px-3 py-1 rounded-full m-1"
                    placeholder="search news"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    onFocus={clear}
                />
                <button type="submit"
                 className=" outline-none px-3 py-1 rounded-full bg-white font-bold m-1 hover:bg-blue-500 hover:text-white"
                >
                    Search
                </button>
            </form>
            <div>
                {
                    myData.map((item) => (
                        <div key={item.objectID} className="bg-white m-5 p-3 sm:p-10 rounded-3xl">
                            <h3 className="text-xl text-zinc-800 underline decoration-red-600 text-center">
                                <a href={item.story_url} target="_blank" >{item.story_title}</a>
                            </h3>
                            <div className="border border-cyan-400 p-3 flex justify-between my-3 rounded-3xl">
                                <p>Author: {item.author}</p>
                                <p>Created time: {item.created_at}</p>
                            </div>
                            <div>
                                <p className="overflow-x-hidden bg-zinc-700 text-white p-4 rounded-3xl">Comments: <br /> {item.comment_text} </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default App;
