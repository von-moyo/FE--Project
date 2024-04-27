# Features and Functionalities

This documentation will guide you through the various features and functionalities of this web application, starting from the authentication page and walking you through each subsequent page until you reach the user details page. Each feature will be explained in detail, along with explanations for the decisions I made.

## Login-Auth page
Since an authentication page was provided, I decided to include an authentication feature. Since authentication was implemented, I also included protected routes feature - this enables only authenticated users to access subsequent pages, if not, they are redirected to the log in page.

## Routing

Almighty React-Router was used to implement routing feature.

## Fetching Data

I fetched data through out the applications with axios.

Axios interceptors provided a way to intercept and modify HTTP requests and responses before they are handled by the application.

# Authenticated Pages

## Users Page

Fetching And Populating Data In The Users Page
I used Generics in TypeScript to type check the value of the returned data like this:

```

  const [users, setUsers] = useState<UserTableItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  
  return (
    <>
      <Preloader loading={loading}/>
      <UsersUI
        handleView={handleView}
        blacklist={handleBlacklisting}
        activate={handleActivate}
        users={paginatedUsers}
        pagination={{
          handleChange: handlePageChange,
          total: totalPages,
          current: currentPage,
          count: totalUsers,
          limit: usersPerPage,
          info: info,
        }}
      />
    </>
  );
};
```
This was implemented like this because the shape of the data coming from the API is unknown, hence Generics came in handy. The above code implies that paginatedUsers is a an array of objects gotten from the sliced data form users array.

The returned data was later populated in the UI with a Custom Table component that uses the HTML table tag. This was used as the preferred method because HTML Tables allows for proper alignment of the kind of the design provided. Note that, this table is scrollable on mobile.

## Pagination Feature

The pagination feature at the bottom of the table, was implemented by creating a custom funcitionality for seamless implementation and designed by your truly. I adde dthe functionality of buttons to view the data in groups of 10s by setting a variable called pageLimit to 10.

## Users Page

Fetching Data And Populating In The Users  Page
In the user page, I used index-signature to represent the data type of the return value from the API like this:

```

  const [users, setUsers] = useState<UserTableItem[]>([]);
  
 ```
This indicates that user is an object of properties whose key is a type of string and value is of type of any.

I used Axios To Fetch The Details of All users

    ```
      useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      axios
        .get("/templates/yfAg_qoICtcr/data", {
          baseURL: process.env.REACT_APP_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "lendsqrAdminAccess"
            )}`,
          },
        })
        .then((response) => {
          const userResults = response.data;
          type optionType = {
            year: "numeric" | "2-digit" | undefined;
            month: "long";
            day: "numeric";
            hour: "numeric";
            minute: "numeric";
            second: "numeric";
            hour12: true;
          };
          const options: optionType = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          };
          const userList: UserTableItem[] = userResults.map((user: any) => ({
            id: user.id,
            organization: user.organization,
            name: user.profile.name,
            email: user.email,
            phoneNumber: "09086465372",
            dateCreated: new Intl.DateTimeFormat("en-US", options).format(
              new Date(user.updatedAt)
            ),
            status: user.roles[0],
          }));
          setUsers(userList);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
        });
    };

    fetchData();

  }, []);

    ```
The algorithm First checks if the loading state is set to true or false to show the preloader component then the request is made and I am slicing the data to only get the key-value pairs I need. I am then setting the loading state to false after the request is made and updating my empty state to the sliced data.

After this process is completed, data is then populated to the UI.
