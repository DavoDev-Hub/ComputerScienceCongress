import { Button } from './ui/button'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Settings, Users, QrCode, LogOut } from 'lucide-react'
import logoUaa from '../assets/logo_uaa.svg'
import '../App.css'


function navAdmin() {
    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                    <img src={logoUaa} alt="UAA" className="h-8 w-auto" />
                    <h1 className="text-xl font-bold text-uaa-blue">LITC CONGRESO</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-uaa-blue hover:text-white"
                    >
                        <Settings className="h-4 w-4 mr-2" />
                        Panel Actividades
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-uaa-blue hover:text-white"
                    >
                        <Settings className="h-4 w-4 mr-2" />
                        Panel Conferencias
                    </Button>


                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-uaa-blue hover:text-white"
                    >
                        <Users className="h-4 w-4 mr-2" />
                        Estudiantes
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-uaa-blue hover:text-white"
                    >
                        <QrCode className="h-4 w-4 mr-2" />
                        Asistencias
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-uaa-blue text-white">
                                        AD
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                Cerrar sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}

export default navAdmin
