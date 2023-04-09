'use client';

import React, { useState, useEffect, useRef } from "react";
import { SearchbarDropdown } from './SearchbarDropdown'
import { CategoryScroll } from './Categoryscroll'
import { RoomList } from './Roomlist'
import * as chatFunctions from '../api/services/chatrooms'

export default function Homepage() {


  const [options, setOptions] = useState([])
  const [categoryChoice, setCategoryChoice] = useState([])
  const [categoryOption, setCategoryOption] = useState("")
  const [finalCategoryList, setfinalCategoryList] = useState([])
  const [conversation, setConversation] = useState([])

  const onInputChange = (e) => {
    const value = e.target.value
    setOptions(
      finalCategoryList.filter(option =>
        option.toLowerCase().includes(value.toLowerCase()))
    )
  }

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const roomList = await chatFunctions.getRooms();
        const newRoomList = [...roomList]
        setConversation(newRoomList)
        let categoryList = [];
        roomList.forEach(room => {
          const { category } = room
          categoryList.push(category)
        })
        const uniqueCategories = [... new Set(categoryList)]
        setfinalCategoryList(uniqueCategories)
      } catch (error) {
        console.error(error);
      }
    }
    getAllRooms();
  }, []);

  useEffect(() => {
    // console.log(finalCategoryList);
    // console.log(conversation);
  }, [finalCategoryList, conversation])


  // Simulated db
  const defaultOptions =
    [
      'Targaryen', 'Lannister', 'Stark', 'Baratheon', 'Tyrell',
    ];

  return (
    <div className="home-parent">
      <h3 className="home-search">Search Bar Dropdown</h3>
      <SearchbarDropdown
        options={options}
        onInputChange={onInputChange}
        categoryChoice={categoryChoice}
        setCategoryChoice={setCategoryChoice}
        finalCategoryList={finalCategoryList}
      />
      <button className="home-search-button">Search</button>
      <CategoryScroll
        categoryOption={categoryOption}
        setCategoryOption={setCategoryOption}
        categoryChoice={categoryChoice}
        finalCategoryList={finalCategoryList}
      />
      <RoomList
        categoryOption={categoryOption}
        finalCategoryList={finalCategoryList}
        conversation={conversation}
      />
    </div>
  )
}