import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSalary } from "../store/slices/income.slice";

export const useGeneration = () => {
    const salary = useSelector(selectSalary);
    
}