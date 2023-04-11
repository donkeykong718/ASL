"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from './Categories.module.css';

export const RoomList = (props) => {
  const { categoryOption, finalCategoryList, conversation } = props;

  // console.log(conversation);
  // console.log(categoryOption);

  const setButtons = () => {
    let buttons = null;
    if (categoryOption === "") {
      buttons = conversation.map((option) => {
        return (
          <tr>
            <button
              type="button"
              key={option.id}
              className={styles.roomButtons}
              onClick={() => { location.href = `/chat/${option.category}/${option.name}` }}
            >{option.name}
            </button>
          </tr>
        );
      });
    } else {
      buttons = conversation
        .filter((option) => option.category === categoryOption)
        .map((option) => {
          return (
            <tr>
              <button
                type="button"
                key={option.id}
                className={styles.roomButtons}
                onClick={() => { location.href = `/chat/${option.category}/${option.name}` }}
              >{option.name}
              </button>
            </tr>
          )
        });
    }
    return buttons;
  }

  return (
    <div className={styles.roomListDisplay}>
      <h3 className={styles.roomListTitle}>Choose a room</h3>
      <div class="sunken-panel" style={{ height: '120px', width: '240px' }}>
        <table class="interactive">
          <thead>
            <tr>
              <th className={styles.roomListHeader}>
                {categoryOption ? `Rooms in ${categoryOption}` : "Pick a room:"}
              </th>
            </tr>
          </thead>
          <tbody>
            {setButtons()}
          </tbody>
        </table>
      </div>
    </div>
  )
}


