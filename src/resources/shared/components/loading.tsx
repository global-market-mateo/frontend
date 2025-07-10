import { Oval } from "react-loader-spinner";
export const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
