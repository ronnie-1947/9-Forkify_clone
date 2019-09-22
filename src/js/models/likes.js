export default class Likes {
    constructor(){
        this.Likes = [];
    }

    addLike(id , title, author , img) {
        const like = {id , title , author , img};
        this.Likes.push(like);

        // Persist data in localStorage
        this.persistData();
        // console.log(this.likes)
        // console.log(like);
        
        return like ;
    }
    
    deleteLikes(id){
        const index = this.Likes.findIndex(el => el.id === id);
        this.Likes.splice(index , 1);

        // Perist data in localStorage
        this.persistData();
    }
    
    isLiked(id){
        return this.Likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.Likes.length ;
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.Likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restore likes from the localStorage
        if (storage) this.Likes = storage;
        // console.log(storage)
    }
}