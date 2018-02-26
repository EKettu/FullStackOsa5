let token = null

const blogs = [
    {
        title: "Testataan taas blogin luontia",
        author: "Testaaja",
        url: "testi.com",
        likes: 7,
        id: "5a8d7dcd65135118e5e35718",
        user: {
            _id: "5a85533b9314d1c0db3bbf7b",
            username: "mluukkai",
            name: "Matti Luukkainen"
        }
    },
    {
        title: "Uusi Testi",
        author: "Testaaja",
        url: "testi",
        likes: 0,
        id: "5a8eb933d393f224bc19ea75",
        user: {
            _id: "5a85533b9314d1c0db3bbf7b",
            username: "mluukkai",
            name: "Matti Luukkainen"
        }
    },
    {
        title: "J Jokusen blogi",
        author: "J Jokunen",
        url: "ressunkoppi.com",
        likes: 2,
        id: "5a8eb97dd393f224bc19ea76",
        user: {
            _id: "5a8ea0df89f42d20f84ea5cf",
            username: "jjokun",
            name: "Jaska Jokunen"
        }
    }
]

const getAll = () => {
    console.log('blogs is ', blogs)
    return Promise.resolve(blogs)
}

export default { getAll, blogs }