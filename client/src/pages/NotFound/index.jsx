import Header from "@/components/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min_h_screen_fixed">
        <h1 className="text-4xl border-r pr-4">404</h1>
        <p className="pl-4">This page couldn't be found.</p>
      </div>
    </>
  );
}
