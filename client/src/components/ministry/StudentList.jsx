import React from "react";
function StudentList() {
  return (
    <div className="table-container max-h-max w-full">
      <div className="uppercase text-xl my-5 text-center font-semibold">
        Danh Sách Sinh Viên
      </div>

      {/* search bar */}
      <div className="">
        <div className="pb-4 bg-white">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative ml-2 mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <box-icon color="gray" name='search'></box-icon>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Tìm kiếm"
            />
          </div>
        </div>

        {/* table container */}
        <div className=" max-h-full h-[350px] 2xl:h-[520px] overflow-y-auto ">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs rounded-lg text-gray-700 uppercase bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 sticky top-0">
                STT
              </th>
              <th scope="col" className="px-6 py-3 sticky top-0">
                MSSV
              </th>
              <th scope="col" className="px-6 py-3 sticky top-0">
                Họ Tên
              </th>
              <th scope="col" className="px-3 py-3 sticky top-0"></th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 ">B1906123</td>
              <td className="px-6 py-4 whitespace-nowrap">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">B1906123</td>
              <td className="px-6 py-4">Nguyễn Văn AA</td>
              <td className="px-3 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Sửa
                </a>
              </td>
            </tr>



          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
