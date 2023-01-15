import { PanelMenu } from 'primereact/panelmenu'

const Navigation = () => {
  const navlist = [
    {
      label: 'Experiences', icon: 'pi pi-fw pi-book', command: () => {
        window.location.href = '/experiences';
      }
    },
    {
      label: 'Lines', icon: 'pi pi-fw pi-chart-line', command: () => {
        window.location.href = '/lines';
      }
    },
    {
      label: 'Users', icon: 'pi pi-fw pi-users', command: () => {
        window.location.href = '/users';
      }
    }
  ]

  return (
    <div>
      <header>
        <nav>
          <ul>
            <PanelMenu
              model={navlist}
            />
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navigation