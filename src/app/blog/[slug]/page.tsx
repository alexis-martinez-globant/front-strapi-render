import { Post } from "@/app/interfaces/post";
import { fetchApi } from "@/helpers/fetch-api";
import { formatDate } from "@/helpers/format-data-helper";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc';

const getData = async (slug = "") => {
    const path = "/posts";
    const urlParamsObject = {
        populate: "*",
        filters: {
            slug: slug,
        }
    };
    try {
        const { data } = await fetchApi(path, urlParamsObject);
        return data[0];

    } catch (error) {
        console.error(error);

        return "nada"
    }
}

interface Params {
    params: {
        slug: string;
    };
};

const Slug = async ({ params }: Params) => {

    const { slug } = params;

    // const data = await getData("malditobajista-1")
    const post: Post = await getData(slug)


    if (!post) return notFound();

    const { title, description, publishedAt, image, body } = post.attributes;
    const { url } = image.data.attributes.formats.thumbnail;
    const bodyText = JSON.stringify(body[0].children[0].text);

    // const { url, width, height } = image.data.attributes.formats.thumbnail;

    return (
        <div className="space-y-8">
            <h1 className="text-5xl mt-2 font-extrabold dark:text-black">{title}</h1>
            <p className="text-gray-500 mb-2">{formatDate(publishedAt)}</p>
            <Image
                className="h-auto rounded-lg"
                src={url}
                alt={`imagen de ${title}`}
                width={300}
                height={300}
            />
            <p
                className="mb-3 text-gray-500 dark:text-gray-400 
                first-line:uppercase first-line:tracking-widest first-letter:text-7xl 
                first-letter:font-bold first-letter:text-gray-900 
                dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
                {description}
            </p>
            <div className="prose">
                <MDXRemote source={bodyText} />
            </div>
        </div>
    );
};
export default Slug