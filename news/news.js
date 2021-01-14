import fs from 'fs';

class News{
    constructor(fileName = 'news.json'){
        this.path = `./data/${fileName}`; 
        try {
            fs.readdirSync('data')
        } catch (error) {
            fs.mkdirSync('data')
        }

        try {
            fs.accessSync(this.path);
        } catch (error) {
            fs.writeFileSync(this.path, '[]')
        }
    }

    createId(){
        return new Date().getTime().toString();
    }

    async create(data,id, imageName){
        const totalData = JSON.parse(await fs.promises.readFile(this.path));
        const {content} = data;
        const desc = content.substr(0,100)+'...';

       totalData.push({...data, id, desc,thumbnail:`http://192.168.0.112:5000/${imageName}`});

       fs.promises.writeFile(this.path,JSON.stringify(totalData,null,2));
    }

    async getAll(){
        const data =  JSON.parse(await fs.promises.readFile(this.path));
        return data.filter(news=>delete news.content)
    }

    async getSingle(id){
        const data = JSON.parse(await fs.promises.readFile(this.path));
        return data.find(news => news.id === id);
    }

    async getByCategory(category){
        const data = await this.getAll()
        return data.filter(news=> news.category === category)
    }

    async searchPosts(query){
        try {
            const data = await this.getAll()
            return data.filter(news => news.title.toLowerCase().includes(query.toLowerCase()))
        } catch (error) {
            console.log('Error while searching post.')
        }
    }
}


export default News