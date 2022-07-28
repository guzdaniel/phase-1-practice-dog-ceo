console.log('%c HI', 'color: firebrick')


const init = () => {

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const imgContainer = document.querySelector("#dog-image-container")
    const dogBreedsContainer = document.querySelector("#dog-breeds")
    const breedDropContainer = document.querySelector("#breed-dropdown")

    fetch(imgUrl)
        .then(res => res.json())
        .then(data => {
            const dogImagesLinks = data.message
            dogImagesLinks.forEach(imgLink => {
                imgContainer.innerHTML += `
            <img src="${imgLink}"></img>
            <br>
            `
            })

        })

    fetch(breedUrl)
        .then(res => res.json())
        .then(data => {
            const dogBreedsObj = data.message
            const breedsArray = []

            getDogBreeds(dogBreedsObj, breedsArray)
            renderDogBreeds(breedsArray)
            renderDogBreedColorChange()
            renderDogBreedsBySelection(breedsArray) 
        })


    function renderDogBreedsBySelection(breedsArray){
        breedDropContainer.addEventListener("change", (event) => {
            resetDogBreeds()
            breedsArray.forEach(elem => {
                if (elem.slice(0, 1) === event.target.value) {
                    addLiElements(elem)
                }
            })
        })
    }


    function getDogBreeds(dogBreedsObj, breedsArray) {
        for (const key in dogBreedsObj) {
            if (dogBreedsObj[key].length > 0) {
                dogBreedsObj[key].forEach(elem => {
                    breedsArray.push(`${elem} ${key}`)
                })
            }
            else {
                breedsArray.push(key)
            }
        }
    }

    function addLiElements(elem) {
        dogBreedsContainer.innerHTML += `
        <li>${elem}</li>`
    }

    function resetDogBreeds() {
        dogBreedsContainer.innerHTML = ""
    }

    function renderDogBreeds(breedsArray) {
        breedsArray.forEach(elem => {
            addLiElements(elem)
        })

    }

    function renderDogBreedColorChange() {
        dogBreedsContainer.addEventListener("click", (event) => {
            event.target.style.color = 'salmon'
        })
    }


}
document.addEventListener('DOMContentLoaded', init)
