const inverterLista = (lista: any[]) => {
    const listaInvertida: any[] = []
    for (let i = lista.length - 1; i >= 0; i--) {
        listaInvertida.push(lista[i])
    }
    return listaInvertida
}

export default inverterLista