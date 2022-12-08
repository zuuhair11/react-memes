import React from 'react' ;

function Meme() {
    const [meme, setMeme] = React.useState({
        topText: 'shut up',
        bottomText: 'and take my money',
        randomImage: 'https://i.imgflip.com/3si4.jpg'
    });
    
    const [allMemes, setAllMemes] = React.useState([]);


    // ========== Using async =========
    // If you want to return the clean up function this way allowed you with async
    /**
        useEffect takes a function as its parameter. If that function
        returns something, it needs to be a cleanup function. Otherwise,
        it should return nothing. If we make it an async function, it
        automatically retuns a promise instead of a function or nothing.
        Therefore, if you want to use async operations inside of useEffect,
        you need to define the function separately inside of the callback
        function, as seen below:
    */
    React.useEffect( () => {
        async function getMemes() {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const data = await response.json();
            setAllMemes(data.data.memes);
        }
        getMemes();

    }, []);

    //=========== Using then ==========
    // React.useEffect( () => {
    //     fetch('https://api.imgflip.com/get_memes')
    //         .then(res => res.json())
    //         .then(data => setAllMemes(data.data.memes))
    // }, []);


    function getMemeImage(e) {
        e.preventDefault();

        const randomNumber = Math.floor(Math.random() * allMemes.length) + 1;
        const url = allMemes[randomNumber].url;
        console.log(allMemes[randomNumber])

        setMeme( prevMeme => ( 
            // Destructuring the object so that it can be like topText: '',... and then 
            // I overwrite the randomImage: 'https...' to: randomImage: url
            { ...prevMeme,
                randomImage: url
            }
        ));

    }

    function handleChange(event) {
        const { name, type, value, checked } = event.target;
        
        setMeme( prevMeme => ({
            ...prevMeme,
            [name]: value
            // [name]: type === 'checkbox' ? checked : value
        }));
    }

    return (
        <main>
            <form className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name='topText'
                    value={ meme.topText }
                    onChange={ handleChange }
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name='bottomText'
                    value={ meme.bottomText }
                    onChange={ handleChange }
                />
                <button
                    className="form--button"
                    onClick={ getMemeImage }
                >
                    Get a new meme image 🖼
                </button>
            </form>

            <div className="meme">
                <img src={ meme.randomImage } className="meme--image" />
                <h2 className="meme--text top">{ meme.topText }</h2>
                <h2 className="meme--text bottom">{ meme.bottomText }</h2>
            </div>
        </main>
    );
}



export default Meme ;
