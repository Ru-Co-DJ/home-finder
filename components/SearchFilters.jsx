import { useEffect, useState } from "react";
import {Flex, Select, Box, Text, Input, Spinner, Icon, Button} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {MdCancel} from "react-icons/md";
import Image from "next/image"
import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {
    const router= useRouter();
    const [filters,setFilters] = useState(filterData);
    // filterData is an array of objs : (item:arr:obj:name:str,value:str, placeholder:str, queryName:str)
    // so now filters are that
    const searchProperties = (filterValues) =>{
        const path = router.pathname;
        const {query}=router;
        const values = getFilterValues(filterValues)
        // getFilterValues function takes a filter Values and return an array of objs name,value
        // basically what is doing is taking a value and assigning a string to it 
        // so we can see the url query as ?someting=valueofsomething

        values.forEach((item)=>{
            if(item.value && filterValues?.[item.name]){
                query[item.name] = item.value
                // here we are updating the query
            }

        })
        router.push({pathname:path, query})
    }


    return (
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {filters.map((filter)=>(
                <Box key={filter.queryName}>
                    <Select 
                    placeholder={filter.placeholder}
                    w="fit-content"
                    p="2"
                    onChange={(e)=>searchProperties({[filter.queryName]:e.target.value})}>
                    {/* here we are passing an obj queryName:the selected value in select
                    to searchProperties*/}
                    {filter?.items?.map((item)=>(
                        <option value={item.value} key={item.value}>{item.name}</option>
                    ))}
                    </Select>
                </Box>
            ))}
        </Flex>
    )
}

export default SearchFilters