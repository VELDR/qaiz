import Image from 'next/image';
import LoginButton from '../LoginButton';

const HeroBanner = () => {
  return (
    <section className="px-2 py-32  md:px-0">
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight  sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="block">🔥 Ignite Your</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {' '}
                  Passion{' '}
                </span>
                <span className="">for Learning and Challenge</span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                Dive into knowledge with a click. Pick a topic, and Qaiz,
                powered by OpenAI&apos;s GPT, crafts your quiz. Simple,
                hassle-free curiosity.
              </p>
              <div className="relative flex ">
                <LoginButton
                  text="Try For Free"
                  showArrow={true}
                  className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-75 rounded-md sm:mb-0 sm:w-auto"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden rounded-md sm:rounded-xl">
              <Image
                src={'./landing-page.svg'}
                alt="Inspiring Illustration"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
