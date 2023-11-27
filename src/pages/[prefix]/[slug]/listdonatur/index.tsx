import ListDonatur from "@/components/Program/ListDonatur"
import { SetStateAction, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { findBySlugNew } from "@/erp/program";
import { findTransactionByProgramID } from "@/erp/program";
import { IoArrowBack } from "react-icons/io5";
import Head from "next/head";
import { CompanyContext } from "@/components/context/CompanyContext";
import InfiniteScroll from "react-infinite-scroll-component";
export async function getServerSideProps({ query, req }: any) {
  const slug = query.slug as string;
  let program = await findBySlugNew(slug, req.headers.host);
  let donatur = await findTransactionByProgramID(program[0].id, req.headers.host, 'id,amount,state,create_date,is_anonymous,doa_message', '12', '0');
  return { props: { idProgram: program[0].id, donatur: donatur } };
}

export default function Donatur({ idProgram, donatur }: any) {
  const company: any = useContext(CompanyContext)
  const colorPrimary = company.primary_colour
  const [hasMore, setHasMore] = useState(true);
  const [listDonor, setListDonor] = useState(donatur || [])


  const loadMore = async (lengthOfListDonor: number) => {
    const res = await fetch(`/api/program/findTransactionByProgramID/${idProgram}?fields=id,amount,state,create_date,is_anonymous,doa_message&limit=8&offset=${lengthOfListDonor}`);
    const result = await res.json();
    if (result.transaction.length > 0) {
      setListDonor([...listDonor, ...result.transaction])
    }
  }


  const [selectedOption, setSelectedOption] = useState("latest");
  const router = useRouter();
  function handleBackClick() {
    router.back();
  }
  function handleOptionChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    setSelectedOption(event.target.value);
  }
  const filteredDonatur = listDonor ? listDonor.filter((item: any) => {
    if (selectedOption === "terbaru") {
      return true;
    } else if (selectedOption === "terbesar") {
      return item.amount >= 1000;
    } else if (selectedOption === "terlama") {
      return true;
    } else if (selectedOption === "doa") {
      return item.doa_message;
    } else {
      return true;
    }
  }).sort((a: any, b: any) => {
    if (selectedOption === "terbaru") {
      return b.create_date.localeCompare(a.create_date); // sort by descending order
    } else if (selectedOption === "terbesar") {
      return b.amount - a.amount;
    } else if (selectedOption === "terlama") {
      return a.create_date.localeCompare(b.create_date); // sort by ascending order
    } else {
      return 0;
    }
  }) : (null);
  return (
    <>
      <Head>
        <title>List Donatur</title>
        <link rel="icon" type="image/x-icon" href={company.favicon_url} />
      </Head>
      <div className="bg-gray-100">
        <div className="mx-auto min-h-screen shadow-lg max-w-md relative bg-white">
          <nav className={`bg-[#ffffff] border-gray-200 h-[60px] flex items-center px-4 sm:px-4 py-2.5`} >
            <button onClick={handleBackClick}>
              <IoArrowBack className="text-black w-6 h-6 mr-4" />
            </button>
            <h1 className="text-white font-semibold">List Donatur</h1>
          </nav>
          <div className="flex justify-between p-4">
            <p className="text-base font-semibold">Donasi</p>

            <div className="flex">
              <select
                id="options"
                className=" border rounded px-4 py-1"
                style={{ color: company.accent_colour, borderColor: company.accent_colour }}
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="terbaru">Terbaru</option>
                <option value="terbesar">Terbesar</option>
                <option value="terlama">Terlama</option>
                <option value="doa">Ada Doa</option>
              </select>
            </div>
          </div>
          {filteredDonatur ? filteredDonatur.map((item: any) => {
            return (
              <ListDonatur donatur={item} />

            )
          }) : (null)}
          <InfiniteScroll
            dataLength={listDonor.length}
            next={() => loadMore(listDonor.length)}
            hasMore={hasMore}
            loader={<h3></h3>}
            className="px-0.5 w-full border-b-2 flex justify-center"
          >
            {/* <button className="" onClick={() => loadMore(listDonor.length)}>Load more</button> */}
          </InfiniteScroll>

        </div>
      </div>
    </>
  );
}
