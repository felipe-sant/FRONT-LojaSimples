async function del(url: string, id: string) {
    await fetch(`${url}/${id}`, {
        method: "DELETE"
    })
}

export default del