import { getToken } from "@/lib/authenticate";

export const addToFavourites = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `JWT ${getToken()}`
        },
    });
    const data = await res.json();

    if(res.status === 200){
        return data
    }
    else{
      return []
    }
}

export const removeFromFavourites = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `JWT ${getToken()}`
        },
    });
    const data = await res.json();

    if(res.status === 200){
        return data
    }
    else{
      return []
    }
}

export const getFavourites = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: 'GET',
        headers: {
            Authorization: `JWT ${getToken()}`
        },
    });
    const data = await res.json();

    if(res.status === 200){
        return data
    }
    else{
      return []
    }
}

export const addToHistory = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `JWT ${getToken()}`
        },
    });
    const data = await res.json();

    if(res.status === 200){
        return data
    }
    else{
      return []
    }
}

export const removeHistory = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `JWT ${getToken()}`
        },
    });
    const data = await res.json();

    if(res.status === 200){
        return data
    }
    else{
      return []
    }
}

export const getHistory = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: {
            Authorization: `JWT ${getToken()}`
        },
    });
    const data = await res.json();

    if(res.status === 200){
        return data
    }
    else{
      return []
    }

}