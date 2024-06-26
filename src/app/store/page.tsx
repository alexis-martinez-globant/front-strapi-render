import PageCardStore from "@/app/components/PageCardStore";
import PageHeader from "@/app/components/PageCardHeading";
import Pagination from "@/app/components/PagePagination";
import { fetchApi } from "@/helpers/fetch-api";
import { Book } from "@/app/interfaces/book";

const getBooks = async (page = 1, pageSize = 4) => {
    const path = "/books";
    const urlParamsObject = {
        populate: "*",
        sort: {
            createdAt: "asc",
        },
        pagination: {
            page: page,
            pageSize: pageSize,
        },
    };
    const { data, meta } = await fetchApi(path, urlParamsObject,) || {}
    return {
        data,
        pagination: meta?.pagination
    };

};

const Store = async ({ searchParams }: { searchParams: { page?: string } }) => {
    const { page } = searchParams;
    let pageNumber = page ? parseInt(page) : 1;
    if (isNaN(pageNumber) || pageNumber < 1) {
        pageNumber = 1;
        console.log(
            "Valor no válido como parámetro de página. Se establece a 1. 🐤"
        );
    }

    const { data, pagination } = await getBooks(pageNumber);

    return (
        <div className="space-y-8">
            <PageHeader text="Book Store" />
            <Pagination pagination={pagination} />
            <section className="grid grid-cols-1 gap-4">
                {data ? (
                    data.map((book: Book) => (
                        <PageCardStore
                            key={book.id}
                            book={book}
                        />
                    ))
                ) : (
                    <p>No books found</p>
                )}
            </section>
        </div>
    );
};
export default Store;
