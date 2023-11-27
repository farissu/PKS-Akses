import React, { useContext } from "react";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import { useRouter } from "next/router";
import { PrefixContext } from "../context/PrefixContext";

const ListBeritaCard = ({ news, searchTerm }: any) => {
  let filteredItems = news;
  const prefix = useContext(PrefixContext)
  if (searchTerm) {
    filteredItems = news.filter((item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filteredItems.length === 0) {
      return (
        <div className="w-full h-full text-center flex items-center justify-center mt-32">
          <p className="text-gray-400 font-semibold text-center">
            Mohon Maaf berita tidak ditemukan
          </p>
        </div>
      );
    }
  }

  const stripHTMLTags = (htmlString: string) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.textContent || div.innerText || '';
  };

  // Function to create an excerpt of a certain length (number of words)
  const createExcerpt = (text: string, maxLength: number) => {
    const words = text.split(' ');
    if (words.length <= maxLength) {
      return text;
    }
    return words.slice(0, maxLength).join(' ') + '...';
  };

  return (
    filteredItems.map((item: any) => {
      const slug = item.slug;
      const title = item.name;
      const date = new Date(item.create_date);
      const create_date = format(date, "d MMMM yyyy", { locale: id });
      const thumbnail = item.image_url;
      const router = useRouter();
      const ref = router.query.source ?? '';
      const image = thumbnail
      const description = item.description;
      const cleanedDescription = stripHTMLTags(description);
      const excerpt = createExcerpt(cleanedDescription, 7);
      

      function Berita() {
        router.push(
          prefix + "/berita/" + slug + window.location.search
        );
      }

      return (
        <a className="cursor-pointer" onClick={Berita}>
          <div className="border rounded w-full flex items-center bg-white leading-[1.25em] max-h-full hover:drop-shadow-cyan-500/50">
            <figure className="m-0 mr-5 flex aspect-[16/10] h-fit flex-1 items-center justify-center">
              {/* <img
                src={image + "?w=200&h=125"}
                alt={title}
                width={200}
                height={125}
                decoding="async"
                data-nimg="1"
                placeholder="blur"
                className="h-full w-full object-fill rounded-bl rounded-tl"
              /> */}
            </figure>
            <div className="pr-2 max-w-[65%] flex-col flex-1">
              <h3 className="font-semibold text-xs h-8 w-full mb-2 line-clamp-3">
                {title}
              </h3>
              {/* <p className="text-xs text-gray-600">{excerpt}</p> */}
              <div className="mt-4 items-center justify-between w-full text-xs max-[360px]:text-[10px] max-[280px]:text-[7px]">
                <p className="font-semibold text-xs text-gray-400">
                  {create_date}
                </p>
              </div>
            </div>
          </div>
        </a>
      );
    })
  );
};

export default ListBeritaCard;
