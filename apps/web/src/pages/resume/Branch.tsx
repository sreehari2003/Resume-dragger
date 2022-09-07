import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { AxiosHandler } from '../../api/index';
import { MainLoader } from '../../components/Loader';
import { Protected } from '../../hooks';
import { File } from '../../components/cards';
import { WithSidebar, Topbar } from '../../layout';

interface Data {
    id: string;
    name: string;
}

const Branch = () => {
    Protected();
    const params = useParams();
    // fetching the resumes from provided api
    const [dataVar, setData] = useState<Data[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            const { data } = await AxiosHandler.get(`/api/folder/${params.id}`);
            setData(data.data.File);
            setLoading(false);
        })();
    }, [params]);

    if (isLoading) {
        return (
            <>
                <Topbar />
                <WithSidebar>
                    <MainLoader />
                </WithSidebar>
            </>
        );
    }
    return (
        <>
            <Topbar />
            <WithSidebar>
                <Flex p="8" flexWrap="wrap" position="absolute" left="200">
                    {dataVar?.map((el, index) => (
                        <File name={el.name} resume={el.name} id={index} key={el.name} />
                    ))}
                </Flex>
            </WithSidebar>
        </>
    );
};

export default Branch;
