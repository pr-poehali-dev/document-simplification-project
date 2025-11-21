import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const documentTypes = [
  { id: "npa", name: "Нормативный правовой акт", icon: "Scale" },
  { id: "letter", name: "Служебное письмо", icon: "Mail" },
  { id: "response", name: "Ответ гражданину", icon: "User" },
  { id: "order", name: "Поручение", icon: "ClipboardList" },
  { id: "analytics", name: "Аналитическая записка", icon: "BarChart" },
];

const readyReports = [
  { 
    id: 1, 
    title: "Отчёт по развитию транспортной инфраструктуры", 
    type: "analytics", 
    date: "15.11.2025",
    category: "Транспорт",
    status: "verified"
  },
  { 
    id: 2, 
    title: "Ответ на обращение о благоустройстве дворовой территории", 
    type: "response", 
    date: "18.11.2025",
    category: "ЖКХ",
    status: "verified"
  },
  { 
    id: 3, 
    title: "Постановление о внесении изменений в правила благоустройства", 
    type: "npa", 
    date: "20.11.2025",
    category: "Благоустройство",
    status: "draft"
  },
  { 
    id: 4, 
    title: "Служебная записка о реализации цифровых проектов", 
    type: "letter", 
    date: "21.11.2025",
    category: "Цифровизация",
    status: "verified"
  },
];

const documentExamples = [
  {
    id: 1,
    title: "Образец постановления администрации города",
    description: "Стандартная структура НПА с обоснованием и ссылками на законодательство",
    type: "npa",
    downloads: 234
  },
  {
    id: 2,
    title: "Шаблон ответа на обращение гражданина",
    description: "Типовой ответ с соблюдением сроков и формы по ФЗ-59",
    type: "response",
    downloads: 456
  },
  {
    id: 3,
    title: "Пример аналитической записки по социальной сфере",
    description: "Структура записки с анализом данных и выводами",
    type: "analytics",
    downloads: 178
  },
];

const thematicDocs = [
  { 
    category: "Транспорт и дороги", 
    count: 342, 
    icon: "Car",
    updated: "21.11.2025"
  },
  { 
    category: "ЖКХ и благоустройство", 
    count: 578, 
    icon: "Home",
    updated: "20.11.2025"
  },
  { 
    category: "Социальная политика", 
    count: 421, 
    icon: "Users",
    updated: "19.11.2025"
  },
  { 
    category: "Образование", 
    count: 289, 
    icon: "GraduationCap",
    updated: "21.11.2025"
  },
  { 
    category: "Здравоохранение", 
    count: 234, 
    icon: "Heart",
    updated: "18.11.2025"
  },
  { 
    category: "Культура и спорт", 
    count: 156, 
    icon: "Trophy",
    updated: "20.11.2025"
  },
];

const Index = () => {
  const [selectedDocType, setSelectedDocType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredReports = readyReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || report.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-12 space-y-12">
        <section className="text-center space-y-4 py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="FileText" className="text-white" size={32} />
          </div>
          <h1 className="text-5xl font-bold text-slate-900">
            База документов GORKYCODE
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Интеллектуальная система работы с документами администрации города
          </p>
        </section>

        <Tabs defaultValue="create" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <TabsList className="h-auto bg-transparent space-y-0 flex-col p-0 col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TabsTrigger 
                value="create" 
                className="h-auto p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Card className="w-full hover:shadow-xl transition-all cursor-pointer border-2 data-[state=active]:border-sky-500 group">
                  <CardContent className="pt-8 pb-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Icon name="FilePlus" className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Создать отчёт</h3>
                      <p className="text-sm text-slate-600">Генерация документа с проверкой НПА</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsTrigger>

              <TabsTrigger 
                value="reports" 
                className="h-auto p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Card className="w-full hover:shadow-xl transition-all cursor-pointer border-2 data-[state=active]:border-emerald-500 group">
                  <CardContent className="pt-8 pb-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Icon name="FolderOpen" className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Готовые отчёты</h3>
                      <p className="text-sm text-slate-600">База проверенных документов</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsTrigger>

              <TabsTrigger 
                value="documents" 
                className="h-auto p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Card className="w-full hover:shadow-xl transition-all cursor-pointer border-2 data-[state=active]:border-violet-500 group">
                  <CardContent className="pt-8 pb-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Icon name="Search" className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Поиск документов</h3>
                      <p className="text-sm text-slate-600">ОДА, СЭДО, Консультант+</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsTrigger>

              <TabsTrigger 
                value="examples" 
                className="h-auto p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Card className="w-full hover:shadow-xl transition-all cursor-pointer border-2 data-[state=active]:border-amber-500 group">
                  <CardContent className="pt-8 pb-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Icon name="BookOpen" className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Примеры отчётов</h3>
                      <p className="text-sm text-slate-600">Шаблоны и образцы</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="create" className="space-y-6 animate-fade-in">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Создать новый отчёт</CardTitle>
                <CardDescription className="text-base">
                  Выберите тип документа и тему для автоматической генерации корректного отчёта
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Тип документа</label>
                  <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Выберите тип документа" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            <Icon name={type.icon as any} size={16} />
                            {type.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Тема отчёта</label>
                  <Input 
                    placeholder="Например: Развитие транспортной инфраструктуры в 2025 году" 
                    className="text-base h-12"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Дополнительные параметры</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-sky-100 hover:border-sky-500 transition-colors py-2 px-3">
                      <Icon name="Link" size={14} className="mr-1" />
                      Проверить ссылки на НПА
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-sky-100 hover:border-sky-500 transition-colors py-2 px-3">
                      <Icon name="AlertTriangle" size={14} className="mr-1" />
                      Найти противоречия
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-sky-100 hover:border-sky-500 transition-colors py-2 px-3">
                      <Icon name="FileSearch" size={14} className="mr-1" />
                      Использовать примеры
                    </Badge>
                  </div>
                </div>

                <Button className="w-full" size="lg" disabled={!selectedDocType}>
                  <Icon name="Sparkles" size={18} className="mr-2" />
                  Создать отчёт
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 animate-fade-in">
            <Card className="max-w-6xl mx-auto">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">Готовые отчёты</CardTitle>
                    <CardDescription className="text-base">База проверенных документов с возможностью использования как шаблонов</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48 h-11">
                        <SelectValue placeholder="Все категории" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        <SelectItem value="npa">НПА</SelectItem>
                        <SelectItem value="letter">Служебные письма</SelectItem>
                        <SelectItem value="response">Ответы гражданам</SelectItem>
                        <SelectItem value="analytics">Аналитика</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Поиск по отчётам..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 h-11"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredReports.map(report => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon 
                                name={documentTypes.find(t => t.id === report.type)?.icon as any || "FileText"} 
                                className="text-white" 
                                size={20} 
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-slate-900">{report.title}</h3>
                                {report.status === "verified" && (
                                  <Badge variant="default" className="bg-green-500">
                                    <Icon name="CheckCircle" size={12} className="mr-1" />
                                    Проверен
                                  </Badge>
                                )}
                                {report.status === "draft" && (
                                  <Badge variant="secondary">
                                    <Icon name="Clock" size={12} className="mr-1" />
                                    Черновик
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Icon name="Calendar" size={14} />
                                  {report.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="Tag" size={14} />
                                  {report.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Icon name="Eye" size={16} className="mr-2" />
                              Просмотр
                            </Button>
                            <Button size="sm">
                              <Icon name="Copy" size={16} className="mr-2" />
                              Использовать
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6 animate-fade-in">
            <Card className="max-w-6xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Поиск по базе документов</CardTitle>
                <CardDescription className="text-base">
                  Найдите релевантные документы для вашей задачи среди тысяч записей из ОДА, СЭДО, Консультант+
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-3">
                  <Input 
                    placeholder="Введите запрос: тема, ключевые слова, номер документа..." 
                    className="flex-1"
                  />
                  <Button>
                    <Icon name="Search" size={18} className="mr-2" />
                    Найти
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer">
                    <Icon name="Filter" size={12} className="mr-1" />
                    Фильтры
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">Актуальные</Badge>
                  <Badge variant="outline" className="cursor-pointer">С ссылками на НПА</Badge>
                  <Badge variant="outline" className="cursor-pointer">Федеральные</Badge>
                  <Badge variant="outline" className="cursor-pointer">Региональные</Badge>
                  <Badge variant="outline" className="cursor-pointer">Муниципальные</Badge>
                </div>

                <div className="bg-slate-50 rounded-lg p-8 text-center space-y-3">
                  <Icon name="Search" size={48} className="mx-auto text-slate-400" />
                  <p className="text-slate-600">Введите запрос для поиска документов</p>
                  <p className="text-sm text-slate-500">
                    Система автоматически проверит актуальность документов и найдёт связанные материалы
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6 animate-fade-in">
            <Card className="max-w-6xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Примеры готовых отчётов</CardTitle>
                <CardDescription className="text-base">
                  Образцы документов с корректной структурой и ссылками на законодательство
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documentExamples.map(example => (
                    <Card key={example.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6 space-y-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <Icon 
                            name={documentTypes.find(t => t.id === example.type)?.icon as any || "FileText"} 
                            className="text-white" 
                            size={20} 
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-slate-900">{example.title}</h3>
                          <p className="text-sm text-slate-600">{example.description}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Icon name="Download" size={12} />
                            {example.downloads} скачиваний
                          </span>
                          <Button variant="outline" size="sm">
                            <Icon name="FileDown" size={14} className="mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>

      <footer className="border-t bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>База документов GORKYCODE 2025 — интеллектуальная система документооборота администрации</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;