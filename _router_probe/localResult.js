(function ($) {
    $.su = $.su || {};

    $.su.localResult = {
        "menu": {
            "advance_menu": [
                {
                    "name": "running-status",
                    "children": [
                        {
                            "name": "status",
                            "children": [
                                {
                                    "name": "status"
                                }
                            ]
                        },
                        {
                            "name": "statistics",
                            "children": [
                                {
                                    "name": "ifstat"
                                },
                                {
                                    "name": "ip_stats"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "device-mgnt",
                    "children": [
                        {
                            "name": "device-mgnt",
                            "children": [
                                {
                                    "name": "global-setting"
                                },
                                {
                                    "name": "device-mgnt"
                                },
                                {
                                    "name": "black-list"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "basic-setting",
                    "children": [
                        {
                            "name": "interface-mode",
                            "children": [
                                {
                                    "name": "interface-mode-setting"
                                }
                            ]
                        },
                        {
                            "name": "wan-settings",
                            "children": [
                                {
                                    "name": "wan-setting-1"
                                },
                                {
                                    "name": "wan-setting-2"
                                },
                                {
                                    "name": "wan-setting-3"
                                },
                                {
                                    "name": "wan-setting-4"
                                }
                            ]
                        },
                        {
                            "name": "lan-settings",
                            "children": [
                                {
                                    "name": "lan-setting"
                                },
                                {
                                    "name": "dhcp-server"
                                },
                                {
                                    "name": "clientlist"
                                },
                                {
                                    "name": "static"
                                },
                                {
                                    "name": "dhcp6-server"
                                },
                                {
                                    "name": "slaac"
                                },
                                {
                                    "name": "clientlist_v6"
                                },
                                {
                                    "name": "static_v6"
                                }
                            ]
                        },
                        {
                            "name": "vlan-settings",
                            "children": [
                                {
                                    "name": "vlan-setting"
                                },
                                {
                                    "name": "port-setting"
                                }
                            ]
                        },
                        {
                            "name": "mac-setting",
                            "children": [
                                {
                                    "name": "mac-setting"
                                }
                            ]
                        },
                        {
                            "name": "switch-settings",
                            "children": [
                                {
                                    "name": "switch-portStatistics"
                                },
                                {
                                    "name": "switch-portMonitor"
                                },
                                {
                                    "name": "switch-portLimit"
                                },
                                {
                                    "name": "switch-portParameter"
                                },
                                {
                                    "name": "switch-portStatus"
                                }
                            ]
                        },
                        {
                            "name": "dns",
                            "children": [
                                {
                                    "name": "dns-proxy"
                                },
                                {
                                    "name": "dns-smart"
                                },
                                {
                                    "name": "dns-policy"
                                },
                                {
                                    "name": "dns-map"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "object-mngt",
                    "children": [
                        {
                            "name": "ip-group",
                            "children": [
                                {
                                    "name": "group"
                                },
                                {
                                    "name": "address"
                                }
                            ]
                        },
                        {
                            "name": "domain-group",
                            "children": [
                                {
                                    "name": "group"
                                },
                                {
                                    "name": "address"
                                }
                            ]
                        },
                        {
                            "name": "time-mngt",
                            "children": [
                                {
                                    "name": "time-mngt"
                                }
                            ]
                        },
                        {
                            "name": "ippool",
                            "children": [
                                {
                                    "name": "ippool"
                                }
                            ]
                        },
                        {
                            "name": "service",
                            "children": [
                                {
                                    "name": "service"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "ap-manage",
                    "children": [
                        {
                            "name": "apmngr",
                            "children": [
                                {
                                    "name": "apmngr"
                                },
                                {
                                    "name": "ap-status"
                                },
                                {
                                    "name": "ap-upgrade"
                                },
                                {
                                    "name": "ac_balance"
                                },
                                {
                                    "name": "ac_roaming"
                                }
                            ]
                        },
                        {
                            "name": "rdmngr",
                            "children": [
                                {
                                    "name": "rdmngr"
                                },
                                {
                                    "name": "band-navigation"
                                },
                                {
                                    "name": "rrm"
                                }
                            ]
                        },
                        {
                            "name": "apmng_roaming_wireless_mode",
                            "children": [
                                {
                                    "name":"apmng_roaming_wireless_mode"
                                }
                            ]
                        },
                        {
                            "name": "apmng_wserv-mngr",
                            "children": [
                                {
                                    "name": "apmng_wserv"
                                }
                            ]
                        },
                        {
                            "name": "wstation-status",
                            "children": [
                                {
                                    "name": "wstation-status"
                                }
                            ]
                        },
                        {
                            "name": "apmng_dhcpdefend",
                            "children": [
                                {
                                    "name": "ac-dhcp-defend"
                                },
                                {
                                    "name": "ac-dhcp-server-list"
                                }
                            ]
                        },
                        {
                            "name": "apmng_arpdefend",
                            "children": [
                                {
                                    "name": "arp_defend_bind_table"
                                },
                                {
                                    "name": "arp_defend_entry_table"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "mesh-manage",
                    "children": [
                        {
                            "name": "apmng_mesh_dev_list",
                            "children": [
                                {
                                    "name": "apmng_mesh_dev_list"
                                },
                                {
                                    "name": "apmng_mesh_upgrade"
                                }
                            ]
                        },
                        {
                            "name": "apmng_mesh_topology",
                            "children": [
                                {
                                    "name": "apmng_mesh_topology"
                                }
                            ]
                        },
                        {
                            "name": "apmng_mesh_wstation",
                            "children": [
                                {
                                    "name": "apmng_mesh_wstation"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "transmisson-control",
                    "children": [
                        {
                            "name": "nat",
                            "children": [
                                {
                                    "name": "napt"
                                },
                                {
                                    "name": "one-nat"
                                },
                                {
                                    "name": "virtual-server"
                                },
                                {
                                    "name": "alg"
                                },
                                {
                                    "name": "nat-dmz"
                                }
                            ]
                        },
                        {
                            "name": "qos",
                            "children": [
                                {
                                    "name": "qos"
                                }
                            ]
                        },
                        {
                            "name": "session-limit",
                            "children": [
                                {
                                    "name": "session-limit"
                                },
                                {
                                    "name": "session-monitor"
                                }
                            ]
                        },
                        {
                            "name": "balance",
                            "children": [
                                {
                                    "name": "basic-setting"
                                },
                                {
                                    "name": "isp-routing"
                                },
                                {
                                    "name": "line-backup"
                                },
                                {
                                    "name": "online"
                                }
                            ]
                        },
                        {
                            "name": "routing",
                            "children": [
                                {
                                    "name": "policy-routing"
                                },
                                {
                                    "name": "static-routing"
                                },
                                {
                                    "name": "static6-routing"
                                },
                                {
                                    "name": "system-routetbl"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "firewall",
                    "children": [
                        {
                            "name": "arp-defense",
                            "children": [
                                {
                                    "name": "imb"
                                },
                                {
                                    "name": "arp-scan"
                                },
                                {
                                    "name": "arp-list"
                                }
                            ]
                        },
                        {
                            "name": "attack-defense",
                            "children": [
                                {
                                    "name": "attack-defense"
                                }
                            ]
                        },
                        {
                            "name": "macFiltering",
                            "children": [
                                {
                                    "name": "macFiltering"
                                }
                            ]
                        },
                        {
                            "name": "access-control",
                            "children": [
                                {
                                    "name": "acl"
                                }
                            ]
                        },
                        {
                            "name": "ipv6-firewall",
                            "children": [
                                {
                                    "name": "ipv6-firewall"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "behavior-control",
                    "children": [
                        {
                            "name": "appdist",
                            "children": [
                                {
                                    "name": "appdist"
                                },
                                {
                                    "name": "bwlist-qq"
                                }
                            ]
                        },
                        {
                            "name": "websiteFilter",
                            "children": [
                                {
                                    "name": "websiteGroup"
                                },
                                {
                                    "name": "websiteFilter"
                                },
                                {
                                    "name": "url-filtering"
                                }
                            ]
                        },
                        {
                            "name": "websiteSecurity",
                            "children": [
                                {
                                    "name": "websiteSecurity"
                                }
                            ]
                        },
                        {
                            "name": "behavior_audit",
                            "children": [
                                {
                                    "name": "actionCheck"
                                }
                            ]
                        },
                        {
                            "name": "anti_share",
                            "children": [
                                {
                                    "name": "share_list"
                                },
                                {
                                    "name": "anti_share"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "vpn",
                    "children": [
                        {
                            "name": "ipsec",
                            "children": [
                                {
                                    "name": "ipsec-setting"
                                },
                                {
                                    "name": "ipsec-sa"
                                }
                            ]
                        },
                        {
                            "name": "l2tp",
                            "children": [
                                {
                                    "name": "l2tp-server"
                                },
                                {
                                    "name": "l2tp-client"
                                },
                                {
                                    "name": "l2tp-tunnel"
                                }
                            ]
                        },
                        {
                            "name": "pptp",
                            "children": [
                                {
                                    "name": "pptp-server"
                                },
                                {
                                    "name": "pptp-client"
                                },
                                {
                                    "name": "pptp-tunnel"
                                }
                            ]
                        },
                        {
                            "name": "vpn-user",
                            "children": [
                                {
                                    "name": "vpn-user"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "security_audit",
                    "children": [
                        {
                            "name": "security_audit",
                            "children": [
                                {
                                    "name": "security_audit"
                                }
                            ]
                        },
                    ]
                },
                {
                    "name": "portal",
                    "children": [
                        {
                            "name": "wportal",
                            "children": [
                                {
                                    "name": "template"
                                },
                                {
                                    "name": "multi_portal"
                                },
                                {
                                    "name": "cloud_portal"
                                },
                                {
                                    "name": "remote_portal"
                                },
                                {
                                    "name": "cmcc_portal"
                                },
                                {
                                    "name": "free"
                                },
                                {
                                    "name": "portal_para"
                                }
                            ]
                        },
                        {
                            "name": "usermngr",
                            "children": [
                                {
                                    "name": "usermngr"
                                },
                                {
                                    "name": "infomngr"
                                }
                            ]
                        },
                        {
                            "name": "authserver",
                            "children": [
                                {
                                    "name": "authserver"
                                },
                                {
                                    "name": "radius"
                                }
                            ]
                        },
                        {
                            "name": "sessmngr",
                            "children": [
                                {
                                    "name": "sessmngr"
                                },
                                {
                                    "name": "nonsense"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "sys-services",
                    "children": [
                        {
                            "name": "pppoe_server",
                            "children": [
                                {
                                    "name": "pppoeserver_global"
                                },
                                {
                                    "name": "pppoeserver_user"
                                },
                                {
                                    "name": "pppoeserver_exceptip"
                                },
                                {
                                    "name": "pppoeserver_session"
                                }
                            ]
                        },
                        {
                            "name": "ddns",
                            "children": [
                                {
                                    "name": "phddns"
                                },
                                {
                                    "name": "cmxddns"
                                },
                                {
                                    "name": "dyn3322ddns"
                                }
                            ]
                        },
                        {
                            "name": "upnp",
                            "children": [
                                {
                                    "name": "upnp"
                                }
                            ]
                        },
                        {
                            "name": "wol",
                            "children": [
                                {
                                    "name": "wol"
                                }
                            ]
                        },
                        {
                            "name": "hnat",
                            "children": [
                                {
                                    "name": "hnat"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "sys-tools",
                    "children": [
                        {
                            "name": "cloud_mngr",
                            "children": [
                                {
                                    "name": "global_config"
                                }
                            ]
                        },
                        {
                            "name": "account-mngt",
                            "children": [
                                {
                                    "name": "account"
                                },
                                {
                                    "name": "remote-mngt"
                                },
                                {
                                    "name": "account-config"
                                }
                            ]
                        },
                        {
                            "name": "firmware",
                            "children": [
                                {
                                    "name": "factory"
                                },
                                {
                                    "name": "backup-restore"
                                },
                                {
                                    "name": "reboot"
                                },
                                {
                                    "name": "upgrade"
                                },
                                {
                                    "name": "system_mgt"
                                },
                                {
                                    "name": "ha"
                                }
                            ]
                        },
                        {
                            "name": "diagnostic",
                            "children": [
                                {
                                    "name": "diagnostic"
                                },
                                {
                                    "name": "dia_info"
                                },
                                {
                                    "name": "telnet_mngt"
                                }
                            ]
                        },
                        {
                            "name": "user_experience_plan",
                            "children": [
                                {
                                    "name": "user_experience_plan"
                                }
                            ]
                        },
                        {
                            "name": "time-setting",
                            "children": [
                                {
                                    "name": "time-setting"
                                }
                            ]
                        },
                        {
                            "name": "license",
                            "children": [
                                {
                                    "name": "license"
                                }
                            ]
                        },
                        {
                            "name": "upgrade_center",
                            "children": [
                                {
                                    "name": "signature_db"
                                }
                            ]
                        },
                        {
                            "name": "system-log",
                            "children": [
                                {
                                    "name": "system-log"
                                },
                                {
                                    "name": "ac_audit"
                                },
                                {
                                    "name": "ac_report"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "wizard"
                },
                {
                    "name": "logout"
                }
            ]
        },
        "error_code": 0
    };
})(jQuery);
