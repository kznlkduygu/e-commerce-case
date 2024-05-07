import NavBar from "../components/NavBar";

interface HomeProps {}

const Home = (props: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <section className="container  w-full h-full grid grid-cols-1 lg:grid-cols-5 bg-gray-100 pt-10 mx-auto">
        <section className="h-fit col-span-1 lg:col-span-1   grid grid-cols-3">
          Filter
        </section>
        <section className="col-span-1  lg:col-span-3  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
          Ürün Listesi
        </section>
        Sepet
      </section>
    </div>
  );
};

export default Home;
