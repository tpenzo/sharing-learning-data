import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
function StudentList() {
  return (
    <div className="table-container max-h-max w-[99%]">
      <div className="uppercase text-xl my-5 text-center font-semibold">
        Danh Sách Sinh Viên
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="pb-4 bg-white">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative ml-2 mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <box-icon color="gray" name='search'></box-icon>
            </div>
            <input
              type="text"
              id="table-search"
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Tìm kiếm"
            />
          </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" class="px-6 py-3">
                STT
              </th>
              <th scope="col" class="px-6 py-3">
                MSSV
              </th>
              <th scope="col" class="px-6 py-3">
                Họ Tên
              </th>
              <th scope="col" class="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 ">B1906123</td>
              <td class="px-6 py-4 whitespace-nowrap">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>
            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>
            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td class="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td class="px-6 py-4">Nguyễn Văn AA</td>
              <td class="px-3 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>



          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
