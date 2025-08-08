import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PrincipalDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalStaff: 0,
    totalDepartments: 0,
    activeClasses: 0
  });
  const [students, setStudents] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch students data
        const studentsResponse = await api.get("/admin/students");
        const studentsData = studentsResponse.data;
        setStudents(studentsData);

        // Calculate statistics
        setStats({
          totalStudents: studentsData.length,
          totalStaff: 45, // Mock data - replace with actual API call
          totalDepartments: 8, // Mock data
          activeClasses: 24 // Mock data
        });

        // Process department data for charts
        const deptCounts = studentsData.reduce((acc, student) => {
          const dept = student.department || 'Unassigned';
          acc[dept] = (acc[dept] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(deptCounts).map(([name, value]) => ({
          name,
          value,
          fill: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
        }));

        setDepartmentData(chartData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const recentActivities = [
    { id: 1, activity: "New student admission approved", time: "2 hours ago", type: "admission" },
    { id: 2, activity: "Staff meeting scheduled for Monday", time: "4 hours ago", type: "meeting" },
    { id: 3, activity: "Examination results published", time: "1 day ago", type: "results" },
    { id: 4, activity: "Annual event planning started", time: "2 days ago", type: "event" },
  ];

  const quickActions = [
    { title: "View All Students", description: "Manage student records", link: "/students", icon: "👥" },
    { title: "Staff Management", description: "Manage faculty and staff", link: "/staff", icon: "👨‍🏫" },
    { title: "Academic Reports", description: "View academic performance", link: "/reports", icon: "📊" },
    { title: "School Calendar", description: "Manage events and schedule", link: "/calendar", icon: "📅" },
    { title: "Announcements", description: "Create school announcements", link: "/announcements", icon: "📢" },
    { title: "Budget Overview", description: "View financial reports", link: "/budget", icon: "💰" },
  ];

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-center h-96">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Principal Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your school overview.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Generate Report</Button>
          <Button>Create Announcement</Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <span className="text-2xl">👨‍🏫</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              +2 new hires this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <span className="text-2xl">🏫</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDepartments}</div>
            <p className="text-xs text-muted-foreground">
              Across all faculties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <span className="text-2xl">📚</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeClasses}</div>
            <p className="text-xs text-muted-foreground">
              Currently in session
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used administrative functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200 block"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{action.icon}</span>
                    <div>
                      <h3 className="font-medium text-sm">{action.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest school updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Badge variant={
                    activity.type === 'admission' ? 'default' :
                    activity.type === 'meeting' ? 'secondary' :
                    activity.type === 'results' ? 'destructive' : 'outline'
                  }>
                    {activity.type}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Distribution by Department</CardTitle>
            <CardDescription>Current enrollment across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                students: {
                  label: "Students",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Enrollment Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Enrollment Trend</CardTitle>
            <CardDescription>Student admissions over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                admissions: {
                  label: "New Admissions",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { month: "Jan", admissions: 45 },
                    { month: "Feb", admissions: 52 },
                    { month: "Mar", admissions: 48 },
                    { month: "Apr", admissions: 61 },
                    { month: "May", admissions: 55 },
                    { month: "Jun", admissions: 67 },
                  ]}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="admissions" fill="var(--color-admissions)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Students */}
      {students.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Students</CardTitle>
            <CardDescription>Latest student admissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Department</th>
                    <th className="text-left py-2">Phone</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 5).map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 font-medium">{student.name}</td>
                      <td className="py-2 text-gray-600">{student.email}</td>
                      <td className="py-2">
                        <Badge variant="outline">{student.department || 'N/A'}</Badge>
                      </td>
                      <td className="py-2 text-gray-600">{student.phone}</td>
                      <td className="py-2">
                        <Link 
                          to={`/studentdetails/${student.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {students.length > 5 && (
              <div className="mt-4 text-center">
                <Link to="/students" className="text-blue-600 hover:text-blue-800 text-sm">
                  View All Students ({students.length})
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PrincipalDashboard;