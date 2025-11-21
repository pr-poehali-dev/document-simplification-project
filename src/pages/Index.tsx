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
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="FileText" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">База документов</h1>
                <p className="text-sm text-slate-500">GORKYCODE 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Icon name="HelpCircle" size={16} className="mr-2" />
                Помощь
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="text-center space-y-4 py-8">
          <h2 className="text-4xl font-bold text-slate-900">
            Интеллектуальная система работы с документами
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Создавайте корректные документы быстрее с помощью единой базы знаний и проверки на соответствие нормам
          </p>
        </section>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="create">
              <Icon name="FilePlus" size={16} className="mr-2" />
              Создать отчёт
            </TabsTrigger>
            <TabsTrigger value="reports">
              <Icon name="FolderOpen" size={16} className="mr-2" />
              Готовые отчёты
            </TabsTrigger>
            <TabsTrigger value="documents">
              <Icon name="Search" size={16} className="mr-2" />
              Поиск документов
            </TabsTrigger>
            <TabsTrigger value="examples">
              <Icon name="BookOpen" size={16} className="mr-2" />
              Примеры
            </TabsTrigger>
            <TabsTrigger value="themes">
              <Icon name="FolderTree" size={16} className="mr-2" />
              По темам
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Создать новый отчёт</CardTitle>
                <CardDescription>
                  Выберите тип документа и тему для автоматической генерации корректного отчёта
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Тип документа</label>
                  <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                    <SelectTrigger>
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
                    className="text-base"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Дополнительные параметры</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                      <Icon name="Link" size={12} className="mr-1" />
                      Проверить ссылки на НПА
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                      <Icon name="AlertTriangle" size={12} className="mr-1" />
                      Найти противоречия
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                      <Icon name="FileSearch" size={12} className="mr-1" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {documentTypes.slice(0, 3).map(type => (
                <Card key={type.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                        <Icon name={type.icon as any} className="text-sky-600" size={24} />
                      </div>
                      <h3 className="font-medium text-sm">{type.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Готовые отчёты</CardTitle>
                    <CardDescription>База проверенных документов с возможностью использования как шаблонов</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
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
                      className="w-64"
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

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Поиск по базе документов</CardTitle>
                <CardDescription>
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

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Примеры готовых отчётов</CardTitle>
                <CardDescription>
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

          <TabsContent value="themes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Документы по темам</CardTitle>
                <CardDescription>
                  Структурированная база документов по основным направлениям деятельности администрации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {thematicDocs.map((theme, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Icon name={theme.icon as any} className="text-white" size={20} />
                            </div>
                            <Badge variant="secondary">{theme.count}</Badge>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                              {theme.category}
                            </h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <Icon name="Clock" size={12} />
                              Обновлено {theme.updated}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            <Icon name="FolderOpen" size={14} className="mr-2" />
                            Открыть раздел
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

        <section className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Sparkles" size={32} />
            </div>
            <h2 className="text-3xl font-bold">Умная проверка документов</h2>
            <p className="text-sky-50 text-lg">
              Система автоматически проверяет корректность ссылок на законодательство, 
              выявляет противоречия между документами и предлагает актуальные формулировки
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Icon name="CheckCircle" size={20} />
                <span>Проверка НПА</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Icon name="AlertTriangle" size={20} />
                <span>Поиск противоречий</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Icon name="TrendingUp" size={20} />
                <span>Актуальность норм</span>
              </div>
            </div>
          </div>
        </section>
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