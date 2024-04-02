import { lazy, Suspense } from "react";
import Loading from "./component/Loading";
import FallBack from "./component/FallBack";
const LazyLoad = (importFunc: any, access: boolean = true, fallback: string | null = null) => {
    if (!access) {
        return () => {
            return <FallBack fallback={fallback} />
        }
    }
    const LazyComponent = lazy(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(importFunc());
            }, 1000);
        });
    });


    return () => (
        <Suspense fallback={<Loading />}>
            <LazyComponent />
        </Suspense>
    );
};

export default LazyLoad;
