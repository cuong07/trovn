/* eslint-disable react/prop-types */
import { Image } from "antd";

const Index = ({ images }) => {
    const items = images?.map((item) => item.url);
    return (
        <>
            {images && (
                <div className="h-full">
                    <Image.PreviewGroup items={items}>
                        <div className="lg:grid lg:grid-cols-2 grid-cols-1 gap-4 h-full  overflow-hidden rounded-xl ">
                            <Image
                                src={images[0]?.url}
                                alt="image"
                                className="aspect-square object-cover"
                            />
                            <div className="lg:grid hidden grid-cols-2 gap-4">
                                <div className="grid grid-rows-2  gap-2">
                                    <div>
                                        <Image
                                            src={images[1]?.url}
                                            alt="image"
                                            className="aspect-square object-cover"
                                        />
                                    </div>
                                    <div>
                                        <Image
                                            src={images[2]?.url}
                                            alt="image"
                                            className="aspect-square object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-rows-2  gap-2">
                                    <div>
                                        <Image
                                            src={images[3]?.url}
                                            alt="image"
                                            className="aspect-square object-cover"
                                        />
                                    </div>
                                    <div>
                                        <Image
                                            src={images[4]?.url}
                                            alt="image"
                                            className="aspect-square object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Image.PreviewGroup>
                </div>
            )}
        </>
    );
};

export default Index;
