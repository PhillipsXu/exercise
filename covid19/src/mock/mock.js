import Mock from "mockjs";
import data from './data.json';
import datas from './datas.json';

Mock.mock('/mock/data', { data: data });
Mock.mock('/mock/datas', { data: datas });