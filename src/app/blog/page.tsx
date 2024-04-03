import { fetchApi } from "@/helpers/fetch-api";
import PageCardHeading from "../components/PageCardHeading";
import PageCardImage from "../components/PageCardImage";
import { Post } from "../interfaces/post";
import PagePagination from "../components/PagePagination";

const getData = async (page = 1, pageSize = 2) => {
    // const res = await fetch("http://localhost:1337/api/posts", { next: { revalidate: 0 } })
    // const res = await fetch("http://localhost:1337/api/posts", { next: { cache: "no-store" } })
    // const data = await res.json();
    // console.log(data.data);
    const path = "/posts";
    const urlParamsObject = {
        populate: "*",
        sort: {
            createdAt: "asc",
        },
        pagination: {
            page: page,
            pageSize: pageSize
        }
    }
    const { data, meta } = await fetchApi(path, urlParamsObject,)
    return {
        data,
        pagination: meta.pagination
    };
}

interface Props {
    searchParams: {
        page?: string;
    }
}

const Blog = async ({ searchParams }: Props) => {
    const { page } = searchParams;
    let pageNumber = page ? parseInt(page) : 1;

    if (isNaN(pageNumber) || pageNumber < 1) {
        pageNumber = 1;
    }

    const { data, pagination } = await getData(pageNumber);

    return (
        <div>
            <PageCardHeading text="Latest posts" />
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <PagePagination pagination={pagination} />
            <div className="grid gap-3" >
                {
                    data.map((post: Post) => (
                        <PageCardImage key={post.id} post={post} />
                    ))
                }
            </div>
        </div>
    )
}

export default Blog