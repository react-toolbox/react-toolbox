###
@todo
###

module.exports =
  STORAGE   :
    SESSION : "material-console-session"

  SUBROUTES:
    CAMPAIGNS: [
      label: "list", route: "/campaigns/list"
    ,
      label: "reports", route: "/campaigns/reports"
    ]

    CREATIVES: [
      label: "list", route: "/creatives/list"
    ]

  HEIGHT:
    LI : 80
