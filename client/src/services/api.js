const BASE_URL = "http://localhost/StudentInformationSystem/server/api";

async function request(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: "include",

        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },

        ...options,
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
}

export function getDashboard() {
    return request("/Dashboard.php");
}

export function login(payload) {
    return request("/Login.php", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function getCurrentUser() {
    return request("/Me.php");
}

export function getCourses() {
    return request("/Courses.php");
}

export function createCourse(data) {
    return request("/Courses.php", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateCourse(id, data) {
    return request(`/Courses.php?id=${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteCourse(id) {
    return request(`/Courses.php?id=${id}`, {
        method: "DELETE",
    });
}

export function getStudents() {
    return request("/Students.php");
}

export function createStudent(payload) {
    return request("/Students.php", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function updateStudent(id, payload) {
    return request(`/Students.php?id=${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
}

export function deleteStudent(id) {
    return request(`/Students.php?id=${id}`, {
        method: "DELETE",
    });
}